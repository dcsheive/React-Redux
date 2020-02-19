import React from 'react'
class Terms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            terms: []
        };
    }

    render() {
        let terms = this.state.terms;
        return (
            <div>

                <h1>Searched Terms</h1>
                <ul>
                    {terms.map(item => (
                        <li key={item}>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        );
    };
}
export default Terms
