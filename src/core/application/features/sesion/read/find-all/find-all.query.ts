
export class FindAllQuery {
    
    constructor(
                public readonly page:number,
                public readonly pageSize:number,
                public readonly idFacultad:string
                ) { }
    
}