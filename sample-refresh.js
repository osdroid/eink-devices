import { Mira } from './index.js';

try {
  const mira = new Mira.Display();
  mira.sendCommand(Mira.Commands.refresh);
  mira.close();
} catch (err) {
  console.log(err);
}
