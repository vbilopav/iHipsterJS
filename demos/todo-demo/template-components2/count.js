define([], () => {

    let _count = 0;

    return {
        setCount: value => _count = value,
        increase: () => _count++,
        decrease: () => _count--,
    }

});