import { Component, signal, effect, inject, ChangeDetectionStrategy } from '@angular/core';
import { CurrencyService } from '../services/currency-service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './converter.html',
  styleUrls: ['./converter.scss'],
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
