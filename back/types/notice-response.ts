export type NoticeResponse = {
    rss: {
        channel: {
            link: string;
            item: {
                title: string;
                link: string;
                description: string;
                pubDate: string;
                guid: string;
                category: string;
                enclosure?: {
                    $: {
                        url: string;
                        length: string;
                        type: string;
                    }
                };
                'media:content'?: {
                    $: {
                        url: string;
                        type: string;
                    }
                }
            }[]
        }
    }
}

