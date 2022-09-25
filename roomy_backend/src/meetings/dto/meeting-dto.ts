import { User } from "src/repo/models"

export class MeetingDTO{

    _id:string

    title:string

    owner:any

    owner_id:any

    duration:number

    noParticipants:number

    participants:User[]

    date: string

    date_iso: Date

    startDate:Date
    endDate:Date
    room_id:any

    room_name: string
}