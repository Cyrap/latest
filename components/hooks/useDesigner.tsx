'use client'

import React, {useContext} from 'react';
import { DesignerContext } from '../context/DesignerContext';

function useDesigner(){
    const context = useContext(DesignerContext);
    if(context == null){
        throw new Error("use Designer must be used without a DesignerContext")
    }
    return context;
}

export default useDesigner;