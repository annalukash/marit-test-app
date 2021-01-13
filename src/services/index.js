import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadData } from "../store/actions";

const APIServices = (props) => {
    const socket = new WebSocket("ws://testapi.marit.expert:3004");
    const dispatch = useDispatch();

    useEffect(() => {
        getList();
    }, []);

    const getList = () => {
        socket.onopen = () => socket.send({ cmd: "get_list" });
        socket.onmessage = (response) => {       
            const message = JSON.parse(response.data);
            dispatch(loadData(message));
        };
    };

    return <>{props.children}</>;
};

export default APIServices;
