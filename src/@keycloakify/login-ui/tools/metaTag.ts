import { assert } from "tsafe/assert";

export function insertOrUpdateMetaTag(params: {
  name: string;
  content: string;
}) {
  const { name, content } = params;

  const head = document.querySelector("head");

  assert(head !== null);

  remove_existing: {
    const meta_existing = head.querySelector(`meta [name="${name}"]`);

    if (meta_existing === null) {
      break remove_existing;
    }

    meta_existing.remove();
  }

  const meta = document.createElement("meta");

  meta.name = name;
  meta.content = content;

  const meta_last = (() => {
    const metas = head.querySelectorAll("meta");

    let meta_last: HTMLMetaElement | undefined = undefined;

    for (const meta_i of metas) {
      meta_last = meta_i;
    }

    return meta_last;
  })();

  if (meta_last === undefined) {
    head.prepend(meta);
  } else {
    meta_last.insertAdjacentElement("afterend", meta);
  }
}

export function removeMetaTag(params: { name: string }) {
  const { name } = params;

  const head = document.querySelector("head");

  assert(head !== null);

  const meta_existing = head.querySelector(`meta [name="${name}"]`);

  if (meta_existing === null) {
    return;
  }

  meta_existing.remove();
}
