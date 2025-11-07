export interface HeaderState {
  id: string;
  name: string;
  slug: string;
  children?: HeaderState[];
}

export const mockHeaderStates: HeaderState[] = [
  {
    id: "1",
    name: "Dashboard",
    slug: "/dashboard",
    children: [],
  }
]