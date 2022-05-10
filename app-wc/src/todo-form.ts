import {
    FASTElement,
    html,
    observable,
    customElement,
    css,
} from "@microsoft/fast-element";
import type { TextField } from "@fluentui/web-components";
import { typography } from "./typography";

const template = html<TodoForm>`
    <form @submit=${x => x.submitTodo()}>
    <fluent-card class="todo-item">
       <div class="button"> </div>
       <div class="label"> 
       <input 
        :value=${x => x.name}
        placeholder="Add a Todo"
        @input=${(x, c) => x.onDescriptionInput(c.event)}
        ></input>
        </div>
        <div class="button">
        <fluent-button
            type="submit"
            appearance="accent"
            ?disabled=${x => !x.canSubmitTodo}
        > +
        </fluent-button>
        </div>
    </fluent-card>
    </form>
`;

const styles = css`
    ${typography}
`;

@customElement({
    name: "todo-form",
    template,
    styles,
})
export class TodoForm extends FASTElement {
    @observable public name: string = "";

    get canSubmitTodo() {
        return !!this.name;
    }

    public submitTodo() {
        if (this.canSubmitTodo) {
            this.$emit("todo-submit", this.name);
            console.log(this.name);
            this.name = "";
        }
    }

    public onDescriptionInput(event: Event) {
        this.name = (event.target! as TextField).value;
    }
}
