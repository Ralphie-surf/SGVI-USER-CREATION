import { Body, Controller, Delete, Get,HttpException, HttpStatus, Param, ParseIntPipe, Post, Put,Query, Res } from '@nestjs/common';
import { renderToNodeStream } from 'react-dom/server';
import App from '../clients_dev/user-react-web-client/src/App';
import * as React from 'react';
import { Reply, UsersWithCount } from 'src/global/custom.interfaces';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import renderEngine from 'src/global/render.engine';
import { CreateUsersDto } from './dto/create/create-users.dto';
import { UpdateUsersDto } from './dto/update/update-users.dto';
import { Users} from './models/users.entity';
import { UsersService } from './users.service';
//import { FindOneParams } from './validators/params.validator';

@Controller('users')
export class UsersController {

    /**
     * 
     * @param usersService 
     * Inject tenantsService
     */
    constructor(private readonly usersService: UsersService) { }

    /**
     * 
     * @param createUsersDto 
     * Handle Post request for create
     */
    @Post()
    create(@Body() createUsersDto: CreateUsersDto): Promise<Users> {
        //console.log(JSON.stringify(createTenantDto));
        return this.usersService.create(createUsersDto);
    }

    /**
     * Handle Get request for find
     */
    @Get()
    findAll(@Query() query: string): Promise<UsersWithCount> {
        for (const queryKey of Object.keys(query)) {
            if(queryKey == "findOptions"){
                try{
                    return this.usersService.findAllWithOptions(decodeURI(query[queryKey]));
                } catch (error){
                    //throw new HttpException('Forbidden', HttpStatus.NOT_FOUND);
                    throw new HttpException({
                        status: HttpStatus.INTERNAL_SERVER_ERROR,
                        error: `There was a problem accessing users data: ${error.message}`,
                      }, HttpStatus.INTERNAL_SERVER_ERROR);
                }
                
            }
        }
        try{
            return this.usersService.findAll();
        }catch(error){
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: `There was a problem accessing users data: ${error.message}`,
              }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
    }
    

    /**
     * 
     * @param id 
     * Handle Get request for find by id
     */
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: string): Promise<Users> {
        return this.usersService.findOne(id);
    }

    /**
     * 
     * @param id id of tenant to be updated
     * @param updateUsersDto new content
     * Handle Put request for 
     */
    /* FindOneParams not working well. Using ParseIntPipe
    @Put(':id')
    partialUpdate(@Param('id', ParseIntPipe) id: FindOneParams, @Body() updateTenantDto: UpdateTenantDto): Promise<UpdateResult> {
        return this.tenantsService.update1(id, updateTenantDto);
    }
    */
    @Put(':id')
    partialUpdate(@Param('id', ParseIntPipe) id: string, @Body() updateTenantDto: UpdateUsersDto): Promise<UpdateResult> {
        return this.usersService.update1(id, updateTenantDto);
    }

    /**
     * 
     * @param users 
     * Non-partial update. Takes a full tenant without param.
     */
    @Put()
    update(@Body() user: Users): Promise<Users> {
        return this.usersService.update2(user);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: string) {
        return this.usersService.delete(id);
    }

    @Get('web')
    web(@Res() reply: Reply) {
        
        //We want to render the raw way so that we can call renderToStream
        const res = reply.raw;

        /*We want to be able to send some initialization data to the react component
        Just using below string as an illustration placeholder for now. The real value will be 
        when we implement Authentication and Authorization.
        The token will contain whatever data you want to pass but in base64 digest format.
        */
        const initialProps = {jwtToken : "put-the-token-string-here-if-any"};        


        const beforeStream = renderEngine().render('users/before-react-stream.fragment.html', 
            { title: 'Users Administration', UsersActive: true })

        const afterStream = renderEngine().render('users/after-react-stream.fragment.html', 
            { initialProps: JSON.stringify(initialProps) })

        //Write the first rendered fragment (upper html part)
        res.write(beforeStream);

        //write the React app using renderToNodeStream
        const stream = renderToNodeStream(<App {...initialProps}/>)

        stream.addListener('end', () => {
            res.write(afterStream); //Write the last rendered fragment (lower html part)
            res.end();
        });

        //enable stream piping
        stream.pipe(res, { end: false });

    }

}
