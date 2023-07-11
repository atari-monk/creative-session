export function toLowerCaseAndRemoveDot(message: string): string {
  const lowercased = message.charAt(0).toLowerCase() + message.slice(1);
  const withoutDot = lowercased.replace('.', '');
  return withoutDot;
}
