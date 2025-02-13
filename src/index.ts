import {
	FullConfig,
	FullResult,
	Reporter,
	Suite,
	TestCase,
	TestResult,
	TestStep
} from '@playwright/test/reporter';

class ConsoleReporter implements Reporter {
	indent = 0;
	capture = true;

	Reset = '\x1b[0m';
	Bright = '\x1b[1m';
	Dim = '\x1b[2m';
	Underscore = '\x1b[4m';
	Blink = '\x1b[5m';
	Reverse = '\x1b[7m';
	Hidden = '\x1b[8m';

	FgBlack = '\x1b[30m';
	FgRed = '\x1b[31m';
	FgGreen = '\x1b[32m';
	FgYellow = '\x1b[33m';
	FgBlue = '\x1b[34m';
	FgMagenta = '\x1b[35m';
	FgCyan = '\x1b[36m';
	FgWhite = '\x1b[37m';

	BgBlack = '\x1b[40m';
	BgRed = '\x1b[41m';
	BgGreen = '\x1b[42m';
	BgYellow = '\x1b[43m';
	BgBlue = '\x1b[44m';
	BgMagenta = '\x1b[45m';
	BgCyan = '\x1b[46m';
	BgWhite = '\x1b[47m';

	constructor() {}

	onBegin(config: FullConfig, suite: Suite): void {
		this.indent += 1;
	}
	onTestBegin(test: TestCase, result: TestResult): void {
		const indents = '  '.repeat(this.indent);
		console.log(
			`${indents}${this.Bright}${this.BgWhite}${test.titlePath().join(' /')}${this.Reset}`
		);
		this.indent += 1;
	}
	onStepBegin(test: TestCase, result: TestResult, step: TestStep): void {
		if (step.category === 'test.step' || step.category === 'hook') {
			const indents = '  '.repeat(this.indent);
			console.log(`${indents}${this.Dim}- ${step.title}${this.Reset}`);
			this.indent += 1;
		}
	}
	onStepEnd(test: TestCase, result: TestResult, step: TestStep): void {
		if (step.category === 'test.step' || step.category === 'hook') {
			let color = `${this.Dim}`;
			let icon = '✓';
			if (step.error) {
				color = `${this.Bright}${this.BgRed}`;
				icon = '✘';
			}
			this.indent -= 1;
			const indents = '  '.repeat(this.indent);
			console.log(`${indents}${color}${icon} ${step.duration}ms${this.Reset}`);
		}
	}
	onTestEnd(test: TestCase, result: TestResult): void {
		this.indent -= 1;
	}
	onEnd(result: FullResult): void | Promise<void> {
		this.indent -= 1;
	}
}
export default ConsoleReporter;
