type Props = {
  html?: string | null;
  className?: string;
};

export default function WpHtml({ html, className }: Props) {
  if (!html) return null;

  return (
    <div
      className={[
        "text-neutral-400 leading-tight",
        "[&_p]:mb-4 [&_p:last-child]:mb-0",
        "[&_a]:text-white [&_a]:underline [&_a]:decoration-white/20 [&_a:hover]:decoration-brand-red [&_a:hover]:text-brand-red",
        "[&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2",
        "[&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-2",
        className ?? "",
      ].join(" ")}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

