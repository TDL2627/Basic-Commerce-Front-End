"use client";

export default function Products({ params }: { params: { id: string } }) {
    return <div>My prouct id: {params.id}</div>
  }