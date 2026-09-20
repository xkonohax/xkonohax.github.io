type WorkType = "image" | "video";
type Category = "All" | "Photography" | "Design" | "Video";

interface Work {
  id: string;
  type: WorkType;
  title: string;
  category: string;
  src: string;
  videoUrl?: string;
  span?: "wide" | "tall" | "normal";
}

export const WORKS: Work[] = [
  {
    id: "w1",
    type: "image",
    title: "Urban Pulse",
    category: "Photography",
    src: "https://images.unsplash.com/photo-1543872084-c7bd3822856f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    span: "wide",
  },
  {
    id: "w2",
    type: "image",
    title: "Mountain Silence",
    category: "Photography",
    src: "https://images.unsplash.com/photo-1576068036336-328de1be1f2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    span: "tall",
  },
  {
    id: "w3",
    type: "image",
    title: "Studio Light",
    category: "Design",
    src: "https://images.unsplash.com/photo-1738676524296-364cf18900a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    span: "normal",
  },
  {
    id: "w4",
    type: "image",
    title: "Digital Dreams",
    category: "Design",
    src: "https://images.unsplash.com/photo-1663275162414-64dba99065a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    span: "normal",
  },
  {
    id: "w5",
    type: "video",
    title: "Coastal Meditation",
    category: "Video",
    src: "https://images.unsplash.com/photo-1647962431451-d0fdaf1cf21c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    span: "wide",
  },
  {
    id: "w6",
    type: "image",
    title: "Lines & Form",
    category: "Design",
    src: "https://images.unsplash.com/photo-1554793000-245d3a3c2a51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    span: "normal",
  },
  {
    id: "w7",
    type: "image",
    title: "Creative Process",
    category: "Photography",
    src: "https://images.unsplash.com/photo-1623577284502-d65cdc6ba0b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    span: "normal",
  },
  {
    id: "w8",
    type: "image",
    title: "Flavors",
    category: "Photography",
    src: "https://images.unsplash.com/photo-1676471926534-d5c9771909fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    span: "normal",
  },
];

export const CATEGORIES: Category[] = ["All", "Photography", "Design", "Video"];

