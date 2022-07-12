import React from 'react'
import { View, Text, Button } from 'react-native'
import { Subject, merge } from 'rxjs'
import { combineProps, useRxController } from 'rx-react-container'
import { map, scan, startWith } from 'rxjs/operators'

const RxTestController = (container) => {
    const onPlus = new Subject()
    const onMinus = new Subject()

    const count = merge(
        onPlus.pipe(map(() => +1)),
        onMinus.pipe(map(() => -1)),
    ).pipe(
        scan((acc, x) => acc + x, 0),
        startWith(0),
    )

    return {
        input: { onPlus, onMinus },
        output: { count },
    }
}

const useMyRxController = (bareController, props) => {
    const controller = (container) => {
        const bc = bareController(container)
        return combineProps(bc.output, bc.input)
    }
    return useRxController(controller, props)
}


export default (props) => {
    const state = useMyRxController(RxTestController, props)
    const { onPlus, onMinus, count } = state
    return (
        <View style={{ flex: 1 }}>
            <Text>count</Text>
            <Text>{count}</Text>
            <Button onPress={onPlus} title='more' />
            <Button onPress={onMinus} title='less' />
        </View>
    )
}