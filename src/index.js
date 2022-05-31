module.exports = ({ types: t }) => {
    return {
      name: "safari-for-in-workaround",

      visitor: {
        ForInStatement(path) {
          const { scope } = path;
          const { left, right, await: isAwait } = path.node;
          if (isAwait) {
            return;
          }
          const i = scope.generateUidIdentifier("i");
          const keys = scope.generateUidIdentifier("keys");

          const inits = [
            t.variableDeclarator(keys, t.callExpression(
              t.identifier("Object.keys"),
               [right]
              )),
            t.variableDeclarator(i, t.numericLiteral(0))
          ];

          const item = t.memberExpression(
            t.cloneNode(keys),
            t.cloneNode(i),
            true,
          );
          let assignment;
          if (t.isVariableDeclaration(left)) {
            assignment = left;
            assignment.declarations[0].init = item;
          } else {
            assignment = t.expressionStatement(
              t.assignmentExpression("=", left, item),
            );
          }

          let blockBody;
          const body = path.get("body");
          if (
            body.isBlockStatement() &&
            Object.keys(path.getBindingIdentifiers()).some(id =>
              body.scope.hasOwnBinding(id),
            )
          ) {
            blockBody = t.blockStatement([assignment, body.node]);
          } else {
            blockBody = t.toBlock(body.node);
            blockBody.body.unshift(assignment);
          }

          path.replaceWith(
            t.forStatement(
              t.variableDeclaration("let", inits),
              t.binaryExpression(
                "<",
                t.cloneNode(i),
                t.memberExpression(t.cloneNode(keys), t.identifier("length")),
              ),
              t.updateExpression("++", t.cloneNode(i)),
              blockBody,
            ),
          );
        },
      },
    };
}
