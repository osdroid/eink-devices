# Eink library

This small library is intended to allow sending commands to eink devices, although at the moment it only supports the Mira Display from Boox.

It uses the node-hid library to communicate with usb devices. On linux, you would have to either run as root to "write" to the usb device. Or add a new udev rule in (/etc/udev/rules.d/) with:

```
KERNEL=="hidraw*", ATTRS{idVendor}=="0416", ATTRS{idProduct}=="5020", GROUP="plugdev"
```