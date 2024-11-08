export enum QuestionType {
    MultiSelect = "multiselect",
    Single = "single"
}

export class Question {
    answer: number[] = [0]
    answers: string[] = ['']
    question: string = ''
    type: QuestionType = QuestionType.Single
    
    constructor(data?: Partial<Question>){
        this.answer = data?.answer ?? [0]
        this.answers = data?.answers ?? ['']
        this.question = data?.question ?? ''
        this.type = data?.type ?? QuestionType.Single
    }

    validate(): Question {
        // remove out of bounds answers
        this.answer = this.answer.filter(a => a < this.answers.length)
        if (this.type == QuestionType.Single) {
            this.answer = this.answer.slice(0,1)
        }
        if (this.type == QuestionType.MultiSelect || this.type == QuestionType.Single) {
            if (this.answer.length == 0) {
                this.answer = [0]
            }
        }
        return this
    }
    
    addAnswer(answer?: string): Question {
        this.answers.push(answer ?? '')
        return this
    }

    deleteAnswer(index: number): Question {
        this.answers.splice(index, 1)
        this.answer = this.answer.filter(a => a != index)
        this.answer = this.answer.map(a => a > index ? a-1 : a)
        return this
    }
}

export class QuizData {
    questions: Question[]

    constructor(data?: Partial<QuizData>){
        this.questions = data?.questions?.map((q: any) => new Question(q)) ?? [];
    }
}

export class Quiz {
    id: string = ''
    immediate_feedback: boolean = false
    name: string = ''
    one_question_mode: boolean = false
    public: boolean = false
    shared_with: string[] = []
    updated: Date = new Date()
    author: string = ''
    collectionId: string = ''
    collectionName: string = ''
    created: Date = new Date()
    data: QuizData = new QuizData()

    constructor(data?: Partial<Quiz>){
        this.id = data?.id ?? ''
        this.immediate_feedback = data?.immediate_feedback ?? false
        this.name = data?.name ?? ''
        this.one_question_mode = data?.one_question_mode ?? false
        this.public = data?.public ?? false
        this.shared_with = data?.shared_with ?? []
        this.updated = data?.updated ?? new Date()
        this.author = data?.author ?? ''
        this.collectionId = data?.collectionId ?? ''
        this.collectionName = data?.collectionName ?? ''
        this.created = data?.created ?? new Date()
        this.data = new QuizData(data?.data ?? {})
    }

    validate(): Quiz {
        this.data.questions = this.data.questions.map(q => q.validate())
        return this
    }
    
    getQuestion(index: number): Question {
        return this.data.questions[index]
    }

    addQuestion(question?: Partial<Question>): Quiz {
        this.data.questions.push(new Question(question ?? {}))
        return this
    }
  
    deleteQuestion(questionIndex: number): Quiz {
        this.data.questions.splice(questionIndex, 1);
        return this;
    }

    purgeAnswers(): Quiz {
        this.data.questions.forEach(q => q.answer = [-1])
        return this
    }
}
