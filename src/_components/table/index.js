import React, { Component } from 'react';
import Header from './header';
import Row from './row';
import './index.css';

export default class Table extends Component {

    constructor() {
        super();
        this.state = {
            rows: [],
            currentPage: 1,
            rowsPerPage: 10
        };
        this.handleClick = this.handleClick.bind(this);
    }
    user = false;
    first = false;
    last = false;
    sex = false;
    status = false;
    age = false;

    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    addRow = row => {
        const { rows } = this.state;
        this.setState({ rows: [...rows, row] })
    }

    deleteRow = id => (a) => {
        const { rows } = this.state;
        rows.splice(rows.findIndex(row => row.id === id), 1);
        this.setState({ rows });
    }

    editRow = row => {
        const { rows } = this.state;
        rows[rows.findIndex(_row => _row.id === row.id)] = row;
        this.setState({ rows });
    }

    sort = (event) => {
        const { id } = event.target;
        const { rows } = this.state;
        const { columns } = this.props;
        let sorted = [];
        
        if (id === 'username') {
            if (this.user) {
                sorted = rows.sort((a, b) => a.username > b.username ? -1 : 1);
                this.user = false;
            }else {
                sorted = rows.sort((a, b) => a.username > b.username ? 1 : -1);
                this.user = true;
            }
        }

        if (id === 'firstName') {
            if (this.first) {
                sorted = rows.sort((a, b) => a.firstName > b.firstName ? -1 : 1);
                this.first = false;
            }else {
                sorted = rows.sort((a, b) => a.firstName > b.firstName ? 1 : -1);
                this.first = true;
            }
        }

        if (id === 'lastName') {
            if (this.last) {
                sorted = rows.sort((a, b) => a.lastName > b.lastName ? -1 : 1);
                this.last = false;
            }else {
                sorted = rows.sort((a, b) => a.lastName > b.lastName ? 1 : -1);
                this.last = true;
            }
        }

        if (id === 'sex') {
            if (this.sex) {
                sorted = rows.sort((a, b) => a.sex > b.sex ? -1 : 1);
                this.sex = false;
            }else {
                sorted = rows.sort((a, b) => a.sex > b.sex ? 1 : -1);
                this.sex = true;
            }
        }

        if (id === 'status') {
            if (this.status) {
                sorted = rows.sort((a, b) => a.status > b.status ? -1 : 1);
                this.status = false;
            }else {
                sorted = rows.sort((a, b) => a.status > b.status ? 1 : -1);
                this.status = true;
            }
        }

        if (id === 'age') {
            if (this.age) {
                sorted = rows.sort((a, b) => +a.age > +b.age ? -1 : 1);
                this.age = false;
            }
            else {
                sorted = rows.sort((a, b) => +a.age > b.age ? 1 : -1);
                this.age = true;
            }
        }

        this.setState({
            rows: [...sorted]
        })
    }


    render() {
        const { rows, currentPage, rowsPerPage } = this.state;
        const { addRow, deleteRow, editRow, sort, props: { columns } } = this;

        // Logic for displaying todos
        const indexOfLastTodo = currentPage * rowsPerPage;
        const indexOfFirstTodo = indexOfLastTodo - rowsPerPage;
        const currentrows = rows.slice(indexOfFirstTodo, indexOfLastTodo);


        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(rows.length / rowsPerPage); i++) {
            pageNumbers.push(i);
        }

        return <> {/* <React.Fragment> */}
            <h1>Editable Table</h1>
            <table>
                <Header
                    columns={columns}
                    addRow={addRow}
                    sort={sort}
                />
                <tbody>
                    {currentrows.map((row, index) => {
                        return <Row key={row.id} row={row} columns={columns} onDelete={deleteRow(row.id)} onEdit={editRow}/>
                    })}
                </tbody>
            </table>
            <div>
                <ul className="pageNumber">
                    {pageNumbers.map(number => {
                        return (
                            <li
                                key={number}
                                id={number}
                                onClick={this.handleClick}
                            >
                                {number}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>;
    }
}