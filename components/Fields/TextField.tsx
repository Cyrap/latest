'use client'
import { MdTextFields } from "react-icons/md";
import { ElementsType, FormELement, FormElementInstance } from "../FormElements";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const type:ElementsType = "TextField";

const  extraAttributes = {
    label:"Text field",
    helperText:"Helper text",
    required:false,
    placeHolder:"Value here",
}

export const TextFieldFormElement:FormELement = {
    type,
    construct: (id:string) =>({
        id,
        type,
        extraAttributes,
    }),

    designerBtnElement: {
        icon: MdTextFields,
        label:"Text field",
    },


    designerComponent: DesignerComponent,
    formComponent: () => <div>Form component</div>,
    propertisComponent: () => <div>Properties component</div>,
}

type CustomInstance = FormElementInstance & {
    extraAttributes:typeof extraAttributes;
}

function DesignerComponent({elementInstance}:{elementInstance : FormElementInstance}){
    const element = elementInstance as CustomInstance;
    const {label,required, placeHolder,helperText} = element.extraAttributes;
    return <div className="flex flex-col gap-2 w-full">
        <Label>
            {label}
            {required && "*"}
        </Label>
        <Input readOnly disabled placeholder={placeHolder}/>
        {helperText && <p className='text-muted-foreground text-[0.8rem]'>{helperText}</p>}
    </div>
}