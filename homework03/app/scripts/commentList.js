import React from 'react';
import $ from 'jquery';
import Remarkable from 'remarkable';

import Comment from './comment';

module.exports = React.createClass({
    render: function() {
        var commentNodes = this.props.data.map(function(comment) {
            return (
                <Comment firstName={comment.firstName} lastName={comment.lastName} key={comment._id}>
                    {comment.startDate}
                    {comment.id}
                </Comment>
            );
        });
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
});
