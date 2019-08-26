import React from "react";
import { connect } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./style.css";

class Cours extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text: "" }; // You can also pass a Quill Delta here
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value) {
        this.setState({ text: value });
        console.log(this.state);
    }

    modules = {
        toolbar: [
            [{ header: 1 }, { header: 2 }, { header: 3 }, { header: 4 }],
            ["bold", "italic", "underline", "strike"], // toggled buttons
            ["blockquote", "code-block", "link"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }], // superscript/subscript
            [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            [{ font: [] }],
            [{ align: [] }]
        ]
    };

    formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "bullet",
        "list",
        "indent",
        "link",
        "color",
        "background",
        "font",
        "code-block",
        "script",
        "align",
        "size"
    ];
    /*
    <ReactQuill
                theme="snow"
                value={this.state.text}
                onChange={this.handleChange}
                modules={this.modules}
                formats={this.formats}
            />*/

    render() {
        return (
            <ReactQuill
                
                value={this.state.text}
                onChange={this.handleChange}
                modules={this.modules}
                formats={this.formats}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        etat: state.recherche
    };
};

export default connect(mapStateToProps)(Cours);
