import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus Component", () => {
    test("status should be in the state", () => {
        const mockCallback = jest.fn()
        const component = create(<ProfileStatus status={'New testing status'} updateUserStatus={mockCallback}  />);
        const instance = component.getInstance()
        // @ts-ignore
        expect(instance?.state.status).toBe('New testing status');
    });
    test("for default <span> should be displayed", () => {
        const mockCallback = jest.fn()
        const component = create(<ProfileStatus status={'New testing status'} updateUserStatus={mockCallback} />);
        const instance = component.root
        const span = instance.findByType('span')
        expect(span).not.toBeNull();
    });
    test("for <span> should be contain correct status", () => {
        const mockCallback = jest.fn()
        const component = create(<ProfileStatus status={'New testing status'} updateUserStatus={mockCallback} />);
        const instance = component.root
        const span = instance.findByType('span')
        expect(span.children[0]).toBe('New testing status');
    });
    test("for after double click on status <input> should be displayed", () => {
        const mockCallback = jest.fn()
        const component = create(<ProfileStatus status={'New testing status'} updateUserStatus={mockCallback} />);
        const instance = component.root
        expect(() => {
             instance.findByType('input')
        }).toThrow();
    });
    test("for <input> should be displayed in editMode instead of span", () => {
        const mockCallback = jest.fn()
        const component = create(<ProfileStatus status={'New testing status'} updateUserStatus={mockCallback} />);
        const instance = component.root
        const span = instance.findByType('span')
        span.props.onDoubleClick()
        const input = instance.findByType('input')
        expect(input.props.value).toBe('New testing status');
    });
    test("callback should be called and contained correct status", () => {
        const mockCallback = jest.fn()
        const component = create(<ProfileStatus status={'New testing status'} updateUserStatus={mockCallback} />);
        const instance = component.getInstance()
        // @ts-ignore
        instance?.deactivateEditMode()
        expect(mockCallback.mock.calls.length).toBe(1);
        expect(mockCallback.mock.calls[0][0]).toBe('New testing status');
    });
});