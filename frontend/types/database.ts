export interface Root {
    sessions: Sessions
  }
  
  export interface Sessions {
    success: boolean
    meta: Meta
    results: Result[]
  }
  
  export interface Meta {
    served_by: string
    duration: number
    changes: number
    last_row_id: number
    changed_db: boolean
    size_after: number
    rows_read: number
    rows_written: number
  }
  
  export interface Result {
    ID: number
    sessionID: string
    username: any
    email: any
    date: string
    score: number
    aiImageDescription: string
    userDescription: string
    imageURL: string
  }
  