define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.detailsList = (details) => String.html `
<li>
    <strong>Name:</strong>&nbsp;${details.name}
</li>
<li>
    <strong>Company:</strong>&nbsp;<a href="${details.company ? 'https://www.google.com/search?q=' + details.company : ''}">${details.company}</a>
</li>
<li>
    <strong>Location:</strong>&nbsp;<a href="${details.location ? 'https://www.google.com/maps?q=' + details.location : ''}">${details.location}</a>
</li>
<li>
    <strong>Blog:</strong>&nbsp;<a href="${details.blog}">${details.blog}</a>
</li>
<li>
    <strong>Email:</strong>&nbsp;<a href="${details.email}">${details.email}</a>
</li>
`;
});
//# sourceMappingURL=templates.js.map