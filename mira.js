import { HID } from 'node-hid';
const VENDOR_ID = 1046;
const PRODUCT_ID = 20512;
const PAYLOAD_LENGTH = 64;

export const Commands = {
  refresh: 1,
  setColdLightLevel: 6,
  setWarmLightLevel: 7
};

export class Display {
  constructor() {
    this.device = null;
  }

  prepareCommand(command, value = 0) {
    const reportId = 0;
    const payload = new Array(PAYLOAD_LENGTH).fill(0);
    payload[0] = command;
    payload[1] = value;
    payload.unshift(reportId);
    return payload;
  }
  
  getDevice() {
    if (!this.device) {
      this.device = new HID(VENDOR_ID, PRODUCT_ID);
    }
    return this.device;
  }

  processValue(original) {
    const value = Number(original);
    if (isNaN(value)) {
      return 0;
    }
    if (value < 0) {
      return 0;
    }
    if (value > 255) {
      return 255;
    }
    return value;
  }
  
  sendCommand(command, value = 0) {
    const device = this.getDevice();
    const payload = this.prepareCommand(command, this.processValue(value));
    device.write(payload);
  }
  
  close() {
    if (!this.device) {
      return;
    }
    this.device.close();
    this.device = null;
  }
}


