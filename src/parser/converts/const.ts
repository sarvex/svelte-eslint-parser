import type { SvelteConstTag } from "../../ast";
import type { Context } from "../../context";
import type * as SvAST from "../svelte-ast-types";

/** Convert for ConstTag */
export function convertConstTag(
  node: SvAST.ConstTag,
  parent: SvelteConstTag["parent"],
  ctx: Context,
): SvelteConstTag {
  const mustache: SvelteConstTag = {
    type: "SvelteConstTag",
    declaration: null as any,
    parent,
    ...ctx.getConvertLocation(node),
  };
  ctx.scriptLet.addVariableDeclarator(
    node.expression,
    mustache,
    (declaration) => {
      mustache.declaration = declaration;
    },
  );
  const atConstStart = ctx.code.indexOf("@const", mustache.range[0]);
  ctx.addToken("MustacheKeyword", {
    start: atConstStart,
    end: atConstStart + 6,
  });
  return mustache;
}
