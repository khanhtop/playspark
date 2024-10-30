export const setDocument = async (collectionName, documentId, data) => {
  const response = await fetch("/api/firestore/setDoc", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      collectionName: collectionName,
      documentId: documentId,
      data: data,
    }),
  });
  const json = await response.json();
  return json;
};

export const getDocument = async (collectionName, documentId) => {
  const response = await fetch("/api/firestore/getDoc", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      collectionName: collectionName,
      documentId: documentId,
    }),
  });
  const json = await response.json();
  return json;
};

export const deleteDocument = async (collectionName, documentId) => {
  const response = await fetch("/api/firestore/deleteDoc", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      collectionName: collectionName,
      documentId: documentId,
    }),
  });
  const json = await response.json();
  return json;
};

export const addDocument = async (collectionName, data) => {
  const response = await fetch("/api/firestore/addDoc", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      collectionName: collectionName,
      data: data,
    }),
  });
  const json = await response.json();
  return json;
};

export const updateDocument = async (collectionName, documentId, data) => {
  const response = await fetch("/api/firestore/updateDoc", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      collectionName: collectionName,
      documentId: documentId,
      data: data,
    }),
  });
  const json = await response.json();
  return json;
};

export const getCollection = async (collectionName) => {
  const response = await fetch("/api/firestore/getSubCollection", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      collectionName: collectionName,
    }),
  });
  const json = await response.json();
  return json;
};

export const filterCollection = async (
  collectionName,
  filterField,
  filterValue
) => {
  const response = await fetch("/api/firestore/filterCollection", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      collectionName: collectionName,
      filterField: filterField,
      filterValue: filterValue,
    }),
  });
  const json = await response.json();
  return json;
};

export const filterArrayCollection = async (
  collectionName,
  filterField,
  filterValue
) => {
  const response = await fetch("/api/firestore/filterArrayCollection", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      collectionName: collectionName,
      filterField: filterField,
      filterValue: filterValue,
    }),
  });
  const json = await response.json();
  return json;
};
