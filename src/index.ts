import type { Janitor } from "@rbxts/janitor";
import { RunService } from "@rbxts/services";

export namespace JanitorExtension {
	export function Clone<J extends Janitor, I extends Instance>(janitor: J, instance: I): I {
		return janitor.Add(instance.Clone(), (instance) => {
			instance.Destroy();
		});
	}

	export function Connect<J extends Janitor, C extends Callback>(
		janitor: J,
		signal: RBXScriptSignal<C>,
		callback: C,
	): RBXScriptConnection {
		return janitor.Add(signal.Connect(callback), "Disconnect");
	}

	export function BindToRenderStep<J extends Janitor>(
		janitor: J,
		name: string,
		priority: number,
		callback: (dt: number) => void,
	): void {
		RunService.BindToRenderStep(name, priority, callback);
		janitor.Add(() => {
			RunService.UnbindFromRenderStep(name);
		}, true);
	}
}
