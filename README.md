# joytick:bit Package
This ELECFREAKS joytick:bit  Package was developed by [ELECFREAKS](https://www.elecfreaks.com/) with minor assistance from [Tinkercademy](https://tinkercademy.com/).

![](https://github.com/elecfreaks/pxt-joystickbit/blob/master/icon.png)

# joytick:bit introduction




## Code Example
```JavaScript
joystickbit.onButtonEvent(joystickbit.JoystickBitPin.P12, joystickbit.ButtonType.down, function () {
    basic.showString("C")
})
joystickbit.onButtonEvent(joystickbit.JoystickBitPin.P15, joystickbit.ButtonType.down, function () {
    basic.showString("F")
})
joystickbit.onButtonEvent(joystickbit.JoystickBitPin.P13, joystickbit.ButtonType.down, function () {
    basic.showString("D")
})
joystickbit.onButtonEvent(joystickbit.JoystickBitPin.P14, joystickbit.ButtonType.down, function () {
    basic.showString("E")
})
joystickbit.initJoystickBit()
joystickbit.Vibration_Motor(100)
basic.forever(function () {
	
})



```

## License
MIT

## Supported targets
for PXT/microbit (The metadata above is needed for package search.)

