import {follow} from "./users-reducer";
import {usersApi} from "../api/users-api";
import {ResultCodes, ResponseType} from "../api/api";

jest.mock("../api/users-api")

const usersApiMock = usersApi

const result: ResponseType = {
    data: {
        resultCode: ResultCodes.success,
    },
    resultCode: ResultCodes.success,
    messages: []
}
// @ts-ignore
usersApiMock.follow.mockReturnValue(Promise.resolve(result))

test('follow thunk', async () => {
    const thunk = follow(1)
    const dispatchMock = jest.fn()

    // @ts-ignore
    await thunk(dispatchMock)

    expect(dispatchMock).toBeCalledTimes(3)
})