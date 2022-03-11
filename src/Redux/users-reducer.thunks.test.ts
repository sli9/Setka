import {actions, follow, unFollow} from "./users-reducer";
import {usersApi} from "../api/users-api";
import {ResultCodes, ResponseType} from "../api/api";

jest.mock("../api/users-api")

const usersApiMock = usersApi as jest.Mocked<typeof usersApi>
const dispatchMock = jest.fn()
const getStateMock = jest.fn()

beforeEach(() => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
    usersApiMock.follow.mockClear()
    usersApiMock.unfollow.mockClear()
})

const result: ResponseType = {
    data: {
        resultCode: ResultCodes.success,
    },
    resultCode: ResultCodes.success,
    messages: []
}



test('follow thunk', async () => {
    usersApiMock.follow.mockReturnValue(Promise.resolve(result))

    const thunk = follow(1)

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowing(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowing(false, 1))
})

test('unfollow thunk', async () => {
    usersApiMock.unfollow.mockReturnValue(Promise.resolve(result))

    const thunk = unFollow(1)

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowing(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unFollowSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowing(false, 1))
})