export interface registerType{   //对象类型接口
    name?: string;
    email: string;
    password: string;
    password2?: string;
    indetity?: string;
}


export interface registerRulesType

{
    name?: ({
        required: boolean;
        message: string;
        trigger: string;

    } | {
        min: number;
        max: number;
        message: string;
        trigger: string;

    })[];
    email?: {
        required: boolean;
        type: string;
        message: string;
        trigger: string;
    }[];
    password: ({
        required: boolean;
        message: string;
        trigger: string;

    } | {
        min: number;
        max: number;
        message: string;
        trigger: string;

    })[];
    password2?: ({
        required: boolean;
        message: string;
        trigger: string;

    } | {
        min: number;
        max: number;
        message: string;
        trigger: string;

    }|{
        validator:(rule: any, value: any, callback: any)=>void;
        trigger:string;
    })[];
}