export type NoticiaResponse = {
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
                enclosure: {
                    $: {
                        url: string;
                        length: string;
                        type: string;
                    }
                }
            }[]
        }
    }
}

export type NoticiaGuardadaResponse = {
    titulo: string;
    fuente: string;
    descripcion: string;
    imagen: string;
    link: string;
    id: string;
  };