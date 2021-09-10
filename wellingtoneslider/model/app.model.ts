export interface IAppComponentProperties {
    label: string | undefined,
    min: number,
    max: number,
    step: number,
    value: number,
    description?: string,
    onSliderChange: (value: number, range?: [number, number] | undefined) => void    
    //0 = false
    //1 = true
    centerDescription: number | null,
    disabled: boolean
}