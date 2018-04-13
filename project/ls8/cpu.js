/**
 * LS-8 v2.0 emulator skeleton code
 */

/**
 * Class for simulating a simple Computer (CPU & memory)
 */
class CPU {
  /**
   * Initialize the CPU
   */
  constructor(ram) {
    this.ram = ram;

    this.reg = new Array(8).fill(0); // General-purpose registers R0-R7

    // Special-purpose registers
    this.reg.PC = 0; // Program Counter
    this.reg.FL = 0; // Flag
    this.reg[7] = 0xf4; // SP
    this.reg[6] = 0; // Keypress
  }

  /**
   * Store value in memory address, useful for program loading
   */
  poke(address, value) {
    this.ram.write(address, value);
  }

  /**
   * Starts the clock ticking on the CPU
   */
  startClock() {
    this.clock = setInterval(() => {
      this.tick();
    }, 1); // 1 ms delay == 1 KHz clock == 0.000001 GHz
  }

  /**
   * Stops the clock
   */
  stopClock() {
    clearInterval(this.clock);
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.reg[6] = 0b00000001; // Keypress
    });
  }

  stopTimer() {
    clearInterval(this.timer);
  }
  /**
   * ALU functionality
   *
   * The ALU is responsible for math and comparisons.
   *
   * If you have an instruction that does math, i.e. MUL, the CPU would hand
   * it off to it's internal ALU component to do the actual work.
   *
   * op can be: ADD SUB MUL DIV INC DEC CMP
   */
  alu(op, regA, regB) {
    switch (op) {
      case "MUL":
        // !!! IMPLEMENT ME
        return this.reg[regA] * this.reg[regB];
        break;
      case "ADD":
        return this.reg[regA] + this.reg[regB];
    }
  }

  /**
   * Advances the CPU one cycle
   */
  tick() {
    // Load the instruction register (IR--can just be a local variable here)
    // from the memory address pointed to by the PC. (I.e. the PC holds the
    // index into memory of the instruction that's about to be executed
    // right now.)
    // !!! IMPLEMENT ME
    let IR = this.ram.read(this.reg.PC);
    // Debugging output
    //console.log(`${this.reg.PC}: ${IR.toString(2)}`);
    // Get the two bytes in memory _after_ the PC in case the instruction
    // needs them.
    // !!! IMPLEMENT ME
    let operandA = this.ram.read(this.reg.PC + 1);
    let operandB = this.ram.read(this.reg.PC + 2);
    // Execute the instruction. Perform the actions for the instruction as
    // outlined in the LS-8 spec.
    // !!! IMPLEMENT ME
    const ADD = 0b10101000;
    const CALL = 0b01001000;
    const CMP = 0b10100000;
    const HLT = 0b00000001;
    const IRET = 0b00001011;
    const JEQ = 0b01010001;
    const JGT = 0b01010100;
    const JLT = 0b01010011;
    const JMP = 0b01010000;
    const JNE = 0b01010010;
    const LDI = 0b10011001;
    const MUL = 0b10101010;
    const POP = 0b01001100;
    const PRA = 0b01000010;
    const PRN = 0b01000011;
    const PUSH = 0b01001101;
    const RET = 0b00001001;
    const ST = 0b10011010;

    // Increment the PC register to go to the next instruction. Instructions
    // can be 1, 2, or 3 bytes long. Hint: the high 2 bits of the
    // instruction byte tells you how many bytes follow the instruction byte
    // for any particular instruction.
    // !!! IMPLEMENT ME
  }
}

module.exports = CPU;
