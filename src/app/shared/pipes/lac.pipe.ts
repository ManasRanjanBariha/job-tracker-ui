import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lac',
  standalone: true
})
export class LacPipe implements PipeTransform {
  transform(value: number | string): string {
    if (!value) return '';
    
    const num = typeof value === 'string' ? parseFloat(value) : value;
    
    if (isNaN(num)) return '';
    
    // Convert to lac (1 lac = 100,000)
    const lac = num / 100000;
    
    // Return with L suffix
    return `₹${lac}L`;
  }
}
