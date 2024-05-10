import { TextFieldFormElement } from "./Fields/TextField";
export type ElementsType = "TextField"

export type FormELement = {
    type: ElementsType;

construct : (id:string) => FormElementInstance;

    designerBtnElement:{
        icon: React.ElementType;
        label:string;
    }

    designerComponent:React.FC<{
        elementInstance:FormElementInstance;
    }>;
    formComponent:React.FC;
    propertisComponent: React.FC;
}

export type FormElementInstance = {
    id: string;
    type: ElementsType;
    extraAttributes? : Record<string, any>;
}

type FormElementsType = {
    [key in ElementsType]:FormELement;
}

export const FormElements: FormElementsType = {
    TextField: TextFieldFormElement
}