import axios from "axios";
import type { DiaryEntry, NewDiaryEntry } from "./types";

const baseUrl = 'http://localhost:3000/api/diaries'

const getAll = () => {
    return axios.get<DiaryEntry[]>(baseUrl).then(res => res.data)
}

const createNew = (object: NewDiaryEntry) => {
    return axios.post<DiaryEntry>(baseUrl, object).then(res => res.data)
}

export default { getAll, createNew }