export class GeneratorCategory {
    title: string = ''
    values: string[] = ['']

    constructor(data?: Partial<GeneratorCategory>){
        this.title = data?.title ?? ''
        this.values = data?.values ?? ['']
    }
    
    validate(): GeneratorCategory {
        return this
    }
    
    addAnswer(answer?: string): GeneratorCategory {
        this.values.push(answer ?? '')
        return this
    }

    deleteAnswer(index: number): GeneratorCategory {
        this.values.splice(index, 1)
        return this
    }
}

export class Generator {
    id: string = ''
    title: string = ''
    public: boolean = false
    updated: Date = new Date()
    author: string = ''
    collectionId: string = ''
    collectionName: string = ''
    created: Date = new Date()
    data: GeneratorCategory[]  = []

    constructor(data?: Partial<Generator>){
        this.id = data?.id ?? ''
        this.title = data?.title ?? ''
        this.public = data?.public ?? false
        this.updated = data?.updated ?? new Date()
        this.author = data?.author ?? ''
        this.collectionId = data?.collectionId ?? ''
        this.collectionName = data?.collectionName ?? ''
        this.created = data?.created ?? new Date()
        this.data = data?.data?.map((q: any) => new GeneratorCategory(q)) ?? []
    }

    validate(): Generator {
        this.data = this.data.map(q => q.validate())
        return this
    }
    
    getGeneratorCategory(index: number): GeneratorCategory {
        return this.data[index]
    }

    addGeneratorCategory(category?: Partial<GeneratorCategory>): Generator {
        this.data.push(new GeneratorCategory(category ?? {}))
        return this
    }
  
    deleteGeneratorCategory(categoryIndex: number): Generator {
        this.data.splice(categoryIndex, 1);
        return this;
    }

}
