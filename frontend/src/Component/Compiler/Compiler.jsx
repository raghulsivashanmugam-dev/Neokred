import React, { useEffect, useState } from "react";
import TopBar from "../Topbar/Topbar";
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';

import "./compiler.css"

import socketIOClient from 'socket.io-client';
import axios from "axios";
import { baseUrl } from "../../common";

const socket = socketIOClient('http://localhost:4000');

function Compiler() {

    const [code, setCode] = useState();

    useEffect(() => {
        // Listen for code updates from the server
        socket.on('codeUpdated', (updatedCode) => {
            setCode(updatedCode)
        });

        return () => socket.disconnect();
    }, []);

    useEffect(() => {
        axios.get(`${baseUrl}/code`, {
            headers: {
                "Content-Type": " application/json",
                "X-Requested-With": "XMLHttpRequest",
                Authorization: `Bearer ${sessionStorage.getItem("tokens")}`,
            }
        }).then((data) => {
            setCode(data.data.data[0].code)
        }).catch((error) => {

        })
    }, [])

    function onLoadData(event) {
        console.log("load", event)
    }

    function onChangeData(event) {
        setCode(event)
        var data = {
            code: event
        }

        axios.post(`${baseUrl}/code`, data, {
            headers: {
                "Content-Type": " application/json",
                "X-Requested-With": "XMLHttpRequest",
                Authorization: `Bearer ${sessionStorage.getItem("tokens")}`,
            }

        }).then((data) => {

        }).catch((error) => {

        })

        socket.emit('updateCode', event);
    }

    return (
        <div>
            <TopBar />
            <div className="complier-cont">
                <p>Javascript Editor</p>
                <AceEditor
                    className="editor"
                    placeholder="Placeholder Text"
                    mode="javascript"
                    theme="monokai"
                    name="blah2"
                    onLoad={onLoadData}
                    onChange={onChangeData}
                    fontSize={14}
                    showPrintMargin={true}
                    showGutter={true}
                    highlightActiveLine={true}
                    value={code}
                    setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: true,
                        showLineNumbers: true,
                        tabSize: 2,
                    }}
                />
            </div>
        </div>
    )

}

export default Compiler;