/*
 * @Description:
 * @Author: wsy
 * @Date: 2023-03-09 02:18:36
 * @LastEditTime: 2023-03-09 02:21:48
 * @LastEditors: wsy
 */
import { reactive } from 'vue'

interface IState {
  count: number
  name: string
}

const test: IState = reactive({ name: 'wsy', count: 0 })
