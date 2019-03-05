import React, { Component } from 'react';

import SubjectItem from './SubjectItem';

class SubjectList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: this.props.subjects
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.subjects !== this.state.subjects) {
      this.setState({
        subjects: nextProps.subjects
      });
      console.log(this.state.subjects);
    }
  }

  render() {
    return (
      <div>
        {this.state.subjects.map(subject => {
          return (
            <SubjectItem subject={subject} type={this.props.type} key={subject.id} />
          );
        })}

      </div>
    );
  }
}

export default SubjectList;
