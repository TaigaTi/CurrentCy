import { Component, signal, effect, inject, ChangeDetectionStrategy } from '@angular/core';
import { CurrencyService } from '../services/currency-service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="converter-container">
      <h2 class="converter-title">
        <span class="converter-icon">💱</span> Currency Converter
      </h2>
      @if (loading()) {
        <div class="loading">Loading currencies...</div>
      } @else {
        <form [formGroup]="form" (ngSubmit)="convert()" class="converter-form-vertical">
          <div class="form-group">
            <label for="amount">Amount</label>
            <input id="amount" type="number" formControlName="amount" placeholder="Enter amount" min="0" required />
          </div>
          <div class="form-group">
            <label for="from">From</label>
            <select id="from" formControlName="from" required>
              <option value="" disabled selected>Select currency</option>
              @for (code of currencies(); track code) {
                <option [value]="code">{{ code }}</option>
              }
            </select>
          </div>
          <div class="swap-group-vertical">
            <span class="swap" (click)="swap()" title="Swap currencies">⇄</span>
          </div>
          <div class="form-group">
            <label for="to">To</label>
            <select id="to" formControlName="to" required>
              <option value="" disabled selected>Select currency</option>
              @for (code of currencies(); track code) {
                <option [value]="code">{{ code }}</option>
              }
            </select>
          </div>
          <button type="submit" [disabled]="form.invalid || loading()" class="convert-btn-vertical">Convert</button>
        </form>
        @if (error()) {
          <div class="error">{{ error() }}</div>
        }
        @if (result()) {
          <div class="result">{{ result() }}</div>
        }
      }
    </div>
  `,
  styleUrl: './converter.scss',
  providers: [CurrencyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'converter-host'
  }
})
export class Converter {
  private currencyService = inject(CurrencyService);
  private fb = inject(FormBuilder);

  currencies = signal<string[]>([]);
  loading = signal<boolean>(false);
  error = signal<string>('');
  result = signal<string>('');

  form: FormGroup = this.fb.group({
    amount: ['', [Validators.required, Validators.min(0.01)]],
    from: ['', Validators.required],
    to: ['', Validators.required]
  });

  constructor() {
    this.fetchCurrencies();
    effect(() => {
      this.result.set(''); // Clear result on any form change
    }, { allowSignalWrites: true });
  }

  fetchCurrencies() {
    this.loading.set(true);
    this.currencyService.getCurrencies().subscribe({
      next: (codes) => {
        // If codes is Currency[], extract code property; else assume string[]
        if (codes && typeof codes[0] === 'object' && 'code' in codes[0]) {
          this.currencies.set((codes as { code: string }[]).map(c => c.code));
        } else {
          this.currencies.set((codes as any[]).map(String));
        }
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load currencies');
        this.loading.set(false);
      }
    });
  }

  convert() {
    if (this.form.invalid) {
      this.result.set('');
      return;
    }
    const { amount, from, to } = this.form.value;
    // For demo, just show a fake conversion
    const converted = (Number(amount) * 1.23).toFixed(2);
    this.result.set(`${amount} ${from} ≈ ${converted} ${to}`);
  }

  swap() {
    const from = this.form.get('from')?.value;
    const to = this.form.get('to')?.value;
    this.form.patchValue({ from: to, to: from });
    this.result.set('');
  }
}
