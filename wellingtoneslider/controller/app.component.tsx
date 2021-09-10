import  * as React from 'react';
import { useState, useEffect, CSSProperties } from 'react';
import { Slider, ISliderStyles, IStackTokens, Stack, IStackStyles, isControlled } from '@fluentui/react';
import { IAppComponentProperties } from '../model/app.model';
import { FontSizes } from '@fluentui/theme';

const stackTokens: IStackTokens = { childrenGap: 5 };

export const AppComponent: React.FunctionComponent<IAppComponentProperties> = (props) => {
    const [labelValue, setLabelValue] = useState(props.label);
    const [descStyleValue, setDescStyleValue] = useState({})
    const [descriptionValue, setDescriptionValue] = useState(props.description);

    useEffect(() => {
        //0 = false
        //1 = true
        props.centerDescription == 1
        ? setDescStyleValue({
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            width: "100%",
            fontSize: FontSizes.size12,
        })
        : setDescStyleValue({
            alignItems: 'left',
            display: 'flex',
            justifyContent: 'left',
            width: "100%",
            fontSize: FontSizes.size12,
        });
    },[props.centerDescription])
    
    // const itemStyles: React.CSSProperties = {
    //     alignItems: 'center',
    //     display: 'flex',
    //     justifyContent: 'center',
    //     width: "100%",
    //     fontSize: FontSizes.size12,
    //   };

    const sliderStyle = {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
    const labelStyle = {
        width: "100%", 
        alignItems: 'center', 
        justifyContent: 'center'
    }
    
    return (
        <Stack tokens={stackTokens}
        horizontalAlign="center">
            <Slider 
                label={labelValue} 
                min={props.min} 
                max={props.max} 
                step={props.step} 
                value={props.value} 
                onChange={props.onSliderChange}
                showValue 
                snapToStep
                disabled={props.disabled}
                styles={{root:sliderStyle, titleLabel: labelStyle}}/>
            {descriptionValue &&
                 <div style={descStyleValue} >{props.description}</div>
            }
        </Stack>
    )
}

export default AppComponent