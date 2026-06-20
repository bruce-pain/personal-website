import { ImageResponse } from "@vercel/og";
import { getCollection } from "astro:content";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

interface Props {
    title: string;
    description?: string;
    label?: string;
}

function h(
    type: string,
    props: Record<string, unknown> | null,
    ...children: unknown[]
) {
    return {
        type,
        props: {
            ...(props || {}),
            children:
                children.length === 0
                    ? undefined
                    : children.length === 1
                      ? children[0]
                      : children,
        },
        key: null,
    };
}

export async function getStaticPaths() {
    const posts = await getCollection("blog");
    const projects = await getCollection("projects");

	const pages: { slug: string; props: Props }[] = [
		{
			slug: "index",
			props: {
				title: "Franklin Ikeh",
				description: "Software engineer who cares about simple systems",
			},
		},
		{
			slug: "writing",
			props: {
				title: "Writing",
				description: "Things I've written",
				label: "FRANKLIN IKEH / WRITING",
			},
		},
		{
			slug: "projects",
			props: {
				title: "Projects",
				description: "Things I've built",
				label: "FRANKLIN IKEH / PROJECTS",
			},
		},
	];

    for (const post of posts) {
        if (post.data.draft) continue;
        pages.push({
            slug: `writing/${post.id}`,
            props: { title: post.data.title, description: post.data.description, label: "FRANKLIN IKEH / WRITING" },
        });
    }

    for (const project of projects) {
        pages.push({
            slug: `projects/${project.id}`,
            props: {
                title: project.data.name,
                description: project.data.description,
                label: "FRANKLIN IKEH / PROJECTS",
            },
        });
    }

    return pages.map((page) => ({
        params: { slug: page.slug },
        props: page.props,
    }));
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const fontData = readFileSync(
    join(
        __dirname,
        "../../../public/fonts/JetBrainsMonoNLNerdFontMono-Regular.ttf",
    ),
);

export async function GET({ props }: { props: Props }) {
    const { title, description, label } = props;

    return new ImageResponse(
        h(
            "div",
            {
                style: {
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#18181b",
                    color: "#fafafa",
                    fontFamily: "JetBrains Mono",
                    padding: "80px",
                    position: "relative",
                },
            },
            label
                ? h(
                      "div",
                      {
                          style: {
                              fontSize: "20px",
                              color: "#71717a",
                              letterSpacing: "0.05em",
                          },
                      },
                      label,
                  )
                : null,
            h(
                "div",
                {
                    style: {
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "flex-start",
                    },
                },
                h(
                    "div",
                    {
                        style: {
                            fontSize: "64px",
                            fontWeight: 700,
                            lineHeight: 1.1,
                            maxWidth: "90%",
                        },
                    },
                    title,
                ),
                description
                    ? h(
                          "div",
                          {
                              style: {
                                  marginTop: "24px",
                                  fontSize: "24px",
                                  color: "#a1a1aa",
                                  maxWidth: "80%",
                                  lineHeight: 1.4,
                              },
                          },
                          description,
                      )
                    : null,
            ),
            h("div", {
                style: {
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "8px",
                    backgroundColor: "#27272a",
                },
            }),
        ),
        {
            width: 1200,
            height: 630,
            fonts: [
                {
                    name: "JetBrains Mono",
                    data: fontData.buffer,
                    weight: 400,
                    style: "normal",
                },
            ],
        },
    );
}
