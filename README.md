# joytick:bit Package
This ElecFreaks joytick:bit  Package was developed by [ElecFreaks](https://www.elecfreaks.com/) with minor assistance from [Tinkercademy](https://tinkercademy.com/).

![](https://github.com/elecfreaks/pxt-joystickbit/blob/master/icon.png)

# joytick:bit introduction




## Code Example
```JavaScript
gamebit.onButtonEvent(GameBitPin.P13, ButtonType.down, function () {
    gamebit.Vibration_Motor(100)
})
gamebit.onButtonEvent(GameBitPin.P12, ButtonType.down, function () {
    gamebit.Vibration_Motor(100)
})
gamebit.onButtonEvent(GameBitPin.P14, ButtonType.down, function () {
    gamebit.Vibration_Motor(100)
})
gamebit.onButtonEvent(GameBitPin.P15, ButtonType.down, function () {
    gamebit.Vibration_Motor(100)
})
gamebit.initGamebit()
music.beginMelody(music.builtInMelody(Melodies.BaDing), MelodyOptions.Once)

})


```

## License
MIT

## Supported targets
for PXT/microbit (The metadata above is needed for package search.)

