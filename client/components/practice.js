import { useState } from 'react';

function practice() {

    const [initiateState, setState] = useState(0);

    //setInitate is a method
    setState(initiateState + 1);

    //state = 1

    setState(initiateState + 1);

    // state = 2
};

export default practce;