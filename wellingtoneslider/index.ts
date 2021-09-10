import * as React from 'react';
import * as ReactDOM from 'react-dom';
import AppComponent from './controller/app.component';

import {IInputs, IOutputs} from "./generated/ManifestTypes";

export class wellingtoneslider implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private container: HTMLDivElement;
	private currentValue: number | null;
	private min: number;
	private max: number;
	private step: number;
	private label: string;
	private description: string;
	private descriptionalignment: number | null;
	private notifyOutputChanged: () => void;
	private disabled: boolean;
	constructor()
	{

	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement): void
	{
		
		this.container = container;
		this.notifyOutputChanged = notifyOutputChanged;
	}

	private renderControl(context: ComponentFramework.Context<IInputs>)
	{
		this.currentValue = context.parameters.slidervalue.raw == null ? 0 : context.parameters.slidervalue.raw;
		this.min = context.parameters.min.raw == null ? 0 : context.parameters.min.raw;
		this.max = context.parameters.max.raw == null ? 0 : context.parameters.max.raw;
		this.step = context.parameters.step.raw == null ? 0 : context.parameters.step.raw;
		this.label = context.parameters.label.raw == null ? '' : context.parameters.label.raw;
		this.description = context.parameters.description.raw == null ? '' : context.parameters.description.raw;
		this.descriptionalignment = context.parameters.descriptionalignment.raw!;
		this.disabled = context.mode.isControlDisabled;

		//default center alignment
		if(this.descriptionalignment === null) this.descriptionalignment = 1;

		let appProps = {
			label: this.label,
			min: this.min,
			max: this.max,
			step: this.step,
			value: <number>this.currentValue,
			description: this.description,
			centerDescription: this.descriptionalignment,
			disabled: this.disabled,
			onSliderChange: (value: number, range?: [number, number] | undefined) => {
				this.currentValue = value;
				this.notifyOutputChanged();
			}
		}

		ReactDOM.render(React.createElement(AppComponent, appProps), this.container)
	}
	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		this.renderControl(context);
	}

	/**
	 * It is called by the framework prior to a control receiving new data.
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {
			slidervalue:  this.currentValue == null ? undefined : this.currentValue
		};
	}

	/**
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		ReactDOM.unmountComponentAtNode(this.container);
	}

}
