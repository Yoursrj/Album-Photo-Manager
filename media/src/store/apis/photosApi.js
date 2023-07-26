import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from "@faker-js/faker";
//In this section, we import the necessary functions and dependencies.
//We import createApi and fetchBaseQuery from Redux Toolkit Query, which are used to create and configure the API.
//We also import faker from the @faker-js/faker library, which will be used to generate fake data for the photo URLs.

const photosApi = createApi({//We create an API using the createApi function from Redux Toolkit Query. 
    // This function takes a configuration object as an argument.
    reducerPath: 'photos',//index.js line number 28
    // Inside the configuration object, we specify the reducerPath as 'photos', 
    //which is the key under which the state related to this API will be stored in the Redux store.
    baseQuery: fetchBaseQuery({//We also configure the baseQuery using fetchBaseQuery.
        baseUrl: 'http://localhost:3005',//Here, we provide the baseUrl as 'http://localhost:3005', which is the root URL of the server we want to make requests to.
    }),
    //In the given code snippet, the fetchAlbums endpoint is defined using builder.query because it represents a data-fetching operation.
    //It specifies how to make a GET request to fetch albums from the server.
    endpoints (builder){
        return{
            //fetchPhotos is a query endpoint that specifies how to make a request to fetch photos from the serve
            fetchPhotos:builder.query({
                providesTags:(result,error,album) =>{//It includes a providesTags function that specifies which tags are provided by the result of this query. 
                    const tags = result.map((photo)=>{
                    return {type:'Photo',id:photo.id}
             //This part of the code iterates over each photo in the result array and maps it to an object with a type of 'Photo' and the id of the photo. 
            //This creates an array of tags where each tag represents a photo, identified by its unique id. 
            //These tags indicatthe at the cache for each individual photo should be updated.        
                });
                tags.push({type:'AlbumPhoto',id:album.id});//jese hi koi photo hate tabhi naya tag bhej do jisse add wala photo anye tag me aaye jo naya object hai 
                //..iss new tag mw deleted photos ke baad k bache photos hai
            //In addition to the individual photo tags, this line adds another tag to the tags array. This tag has a type of 'AlbumPhoto' and the id of the album. 
            //This tag represents the relationship between the album and the photos fetched. 
            //When a photo is removed, this tag ensures that any components or queries that rely on the association between the album and the photos are updated correctly.
                return tags;
                //Finally, the providesTags function returns the tags array, which contains all the tags representing the individual photos and the relationship between the album and the photos.
                //By returning these tags, Redux Toolkit Query can associate the correct cache entries with the query result and handle cache invalidation accordingly.
                },
                query:(album) =>{//album??
                    return{//It also includes a query function that returns an object with the URL, method, and params for the request.
                        url : '/photos',
                        params : {
                            albumId:album.id,
                        },
                        method:'GET',
                    };
                },
            //Overall, this code within the providesTags function ensures that the cache is properly updated when new photos are fetched or existing photos are removed, 
            //  taking into account the individual photo tags and the relationship between the album and the photos.
            }),
            //Queries are used to fetch data from the server. They represent read-only operations and typically use the builder.query method.
            // The builder.query method allows you to define how to make a GET request and specify the URL, query parameters, and other options for the request. It is used to retrieve data from the server.
            
            addPhoto:builder.mutation({//addPhoto is a mutation endpoint that specifies how to make a request to add a new photo.
                invalidatesTags:(result,error,album)=>{//It includes an invalidatesTags function that specifies which tags should be invalidated when this mutation is executed.
                 return [  {type:'AlbumPhoto',id:album.id} ];//adding ke liye naya tag jayega jo alag hoga remove wale se
                },
                //It also includes a query function that returns an object with the URL, method, and body for the request.
                //The body includes the albumId and a generated fake URL using faker.
                query:(album) =>{
                  return {
                    method: 'POST',
                    url:'/photos',
                    body:{
                        albumId:album.id,
                        url:faker.image.abstract(150,150,true)
                    }
                  }
                }
            }),
            //Mutations, on the other hand, are used to modify data on the server. They represent write operations and typically use the builder.mutation method.
            //The builder.mutation method allows you to define how to make a request that changes data on the server, such as creating, updating, or deleting resources.
            //It is used for actions that modify data.
            removePhoto:builder.mutation({//removePhoto is a mutation endpoint that specifies how to make a request to remove a photo.
                invalidatesTags:(result,error,photo)=>{//. It includes an invalidatesTags function that specifies which tags should be invalidated when this mutation is executed.
                    return [{type:'Photo',id:photo.id}]
                },
                // It also includes a query function that returns an object with the URL and method for the request. 
                //The URL includes the photo.id for the specific photo to be deleted.
                query:(photo)=>{
                    return{
                        method:'DELETE',
                        url : `/photos/${photo.id}`,
                    }
                }
            }),       
            //The addAlbum and removeAlbum endpoints, on the other hand, are defined using builder.mutation because they represent operations that modify data.
            //They specify how to make requests to create and delete albums on the server, respectively.
        }
    }
});

//In summary, query(album) and query(user) are query functions that define the specific details of the requests made for removing an album and adding a new album, respectively.
//The arguments (album and user) passed to these functions likely provide the necessary data to construct the requests and perform the desired operations on the server.

export const{
    useFetchPhotosQuery,
    useAddPhotoMutation,
    useRemovePhotoMutation
}=photosApi;
//Finally, we export the generated hooks for each endpoint (useFetchPhotosQuery, useAddPhotoMutation, useRemovePhotoMutation) so that they can be used in our React components.
//We also export the photosApi object, which contains the API configuration.
export {photosApi};

//That's a high-level explanation of the code. The code sets up an API using Redux Toolkit Query, configures endpoints for fetching photos, adding photos, and removing photos. 
//It also exports hooks to use in React components for interacting with the API.